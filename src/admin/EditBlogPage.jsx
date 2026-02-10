import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Upload,
  Divider,
  Space,
  Row,
  Col,
  Progress,
  message,
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import RichTextEditor from "../components/RichTextEditor";

/* ================= CLOUDINARY ================= */

const uploadToCloudinary = (file, onProgress) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "blog_uploads");
    formData.append("folder", "blog-images");

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      const res = JSON.parse(xhr.responseText);
      resolve(res.secure_url);
    };

    xhr.onerror = reject;

    xhr.open(
      "POST",
      "https://api.cloudinary.com/v1_1/dvtbbuxon/image/upload"
    );
    xhr.send(formData);
  });

/* ================= PAGE ================= */

export default function EditBlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [blocks, setBlocks] = useState([]);
  const [coverPreview, setCoverPreview] = useState("");
  const [coverProgress, setCoverProgress] = useState(0);

  const [originalStatus, setOriginalStatus] = useState("draft");
  const [originalPublishedAt, setOriginalPublishedAt] = useState(null);

  /* ================= LOAD BLOG ================= */

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "blogs", id));

      if (!snap.exists()) {
        message.error("Blog not found");
        navigate("/admin");
        return;
      }

      const d = snap.data();

      form.setFieldsValue({
        title: d.title || "",
        excerpt: d.excerpt || "",
        category: d.category || "Hairstyle",
        status: d.status || "draft",
        coverImage: d.coverImage || "",
      });

      setCoverPreview(d.coverImage || "");
      setOriginalStatus(d.status || "draft");
      setOriginalPublishedAt(d.publishedAt || null);
      setBlocks(Array.isArray(d.content) ? d.content : []);
      setLoading(false);
    };

    load();
  }, [id, navigate, form]);

  /* ================= BLOCK HELPERS ================= */

  const addBlock = (type) => {
    setBlocks((prev) => [
      ...prev,
      type === "heading"
        ? { type: "heading", text: "" }
        : type === "image"
        ? { type: "image", src: "", alt: "" }
        : { type: "richtext", html: "" },
    ]);
  };

  const updateBlock = (i, key, value) => {
    setBlocks((prev) => {
      const copy = [...prev];
      copy[i] = { ...copy[i], [key]: value };
      return copy;
    });
  };

  const normalizeContent = (blocks = []) =>
  blocks.map((b) => {
    if (b.type === "paragraph") {
      return {
        type: "richtext",
        html: `<p>${b.text || ""}</p>`,
      };
    }
    return b;
  });


  const removeBlock = (i) =>
    setBlocks((prev) => prev.filter((_, idx) => idx !== i));

  /* ================= SAVE ================= */

  const save = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);

      const isPublishing =
        originalStatus !== "published" &&
        values.status === "published";
await updateDoc(doc(db, "blogs", id), {
  title: values.title.trim(),
  excerpt: values.excerpt?.trim() || "",
  coverImage: values.coverImage ?? coverPreview, // ← FIX 2
  category: values.category,
  status: values.status,
  content: normalizeContent(blocks), // ← FIX 1
  updatedAt: serverTimestamp(),
  publishedAt: isPublishing
    ? serverTimestamp()
    : originalPublishedAt ?? null,
});


      message.success("Blog updated");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      message.error("Failed to save blog");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <p style={{ padding: 48, textAlign: "center" }}>
        Loading…
      </p>
    );
  }

  /* ================= RENDER ================= */

  return (
    <div style={{ padding: 32 }}>
      <Card title="Edit Blog" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Form layout="vertical" form={form}>

          {/* META */}
          <Row gutter={24}>
            <Col span={16}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true }]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item label="Excerpt" name="excerpt">
                <Input.TextArea rows={3} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Category" name="category">
                <Select size="large">
                  <Select.Option value="Hairstyle">Hairstyle</Select.Option>
                  <Select.Option value="Beard">Beard</Select.Option>
                  <Select.Option value="Grooming">Grooming</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Status" name="status">
                <Select size="large">
                  <Select.Option value="draft">Draft</Select.Option>
                  <Select.Option value="published">Published</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          {/* COVER IMAGE */}
          <Form.Item label="Cover Image">
            <Upload
              showUploadList={false}
              customRequest={async ({ file, onSuccess }) => {
                setCoverProgress(0);
                const url = await uploadToCloudinary(file, setCoverProgress);
                form.setFieldValue("coverImage", url);
                setCoverPreview(url);
                setCoverProgress(100);
                onSuccess();
              }}
            >
              <Button icon={<UploadOutlined />}>Change Cover</Button>
            </Upload>

            {coverProgress > 0 && coverProgress < 100 && (
              <Progress percent={coverProgress} size="small" />
            )}

            {coverPreview && (
              <img
                src={coverPreview}
                alt="Cover"
                style={{
                  marginTop: 12,
                  width: "100%",
                  maxHeight: 240,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            )}
          </Form.Item>

          <Divider />

          {/* CONTENT */}
          <h3>Content</h3>

          {blocks.map((block, i) => (
            <Card
              key={i}
              size="small"
              style={{ marginBottom: 16 }}
              extra={
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeBlock(i)}
                />
              }
            >
              <div className="text-xs uppercase text-gray-400 mb-2">
                {block.type}
              </div>

              {block.type === "heading" && (
                <Input
                  placeholder="Heading"
                  value={block.text}
                  onChange={(e) =>
                    updateBlock(i, "text", e.target.value)
                  }
                />
              )}

              {block.type === "richtext" && (
                <RichTextEditor
                  value={block.html}
                  onChange={(html) =>
                    updateBlock(i, "html", html)
                  }
                />
              )}

              {block.type === "image" && (
                <>
                  <Upload
                    showUploadList={false}
                    customRequest={async ({ file, onSuccess }) => {
                      const url = await uploadToCloudinary(file);
                      updateBlock(i, "src", url);
                      onSuccess();
                    }}
                  >
                    <Button icon={<UploadOutlined />}>
                      Upload Image
                    </Button>
                  </Upload>

                  {block.src && (
                    <img
                      src={block.src}
                      alt=""
                      style={{
                        marginTop: 8,
                        width: "100%",
                        maxHeight: 200,
                        objectFit: "cover",
                        borderRadius: 6,
                      }}
                    />
                  )}

                  <Input
                    style={{ marginTop: 8 }}
                    placeholder="Alt text (optional)"
                    value={block.alt}
                    onChange={(e) =>
                      updateBlock(i, "alt", e.target.value)
                    }
                  />
                </>
              )}
            </Card>
          ))}

          <Space>
            <Button icon={<PlusOutlined />} onClick={() => addBlock("heading")}>
              Heading
            </Button>
            <Button icon={<PlusOutlined />} onClick={() => addBlock("richtext")}>
              Content
            </Button>
            <Button icon={<PlusOutlined />} onClick={() => addBlock("image")}>
              Image
            </Button>
          </Space>

          <Divider />

          <Space>
            <Button
              type="primary"
              loading={saving}
              onClick={save}
            >
              Save Changes
            </Button>
            <Button onClick={() => navigate("/admin")}>
              Cancel
            </Button>
          </Space>
        </Form>
      </Card>
    </div>
  );
}
