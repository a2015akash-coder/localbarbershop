import { memo } from "react";

const LoadingSpinner = () => {
    return (
        <div className="flex min-h-[50vh] items-center justify-center">
            <div className="relative">
                <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
                <div className="absolute top-0 left-0 h-16 w-16 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
            </div>
        </div>
    );
};

export default memo(LoadingSpinner);
