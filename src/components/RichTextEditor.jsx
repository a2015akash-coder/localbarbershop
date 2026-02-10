import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex gap-2 border-b p-2 bg-gray-50">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          Bullet
        </button>
        <button
          onClick={() => {
            const url = prompt("Enter link");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
        >
          Link
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="p-4 prose max-w-none" />
    </div>
  );
}
