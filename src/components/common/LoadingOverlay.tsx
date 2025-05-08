export function LoadingOverlay() {
    return (
        <div className="fixed inset-0 bg-[rgba(36,36,36,0.7)] bg-opacity-50 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
    );
}