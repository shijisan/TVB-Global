export default function Card({ title, children }) {
    return (
        <div className="w-4/5 rounded-xl bg-white min-h-[80vh] max-h-[80vh] drop-shadow py-3 border flex flex-col">
            {title && (
                <div className="px-4 border-b">
                    <h1 className="text-3xl poppins py-2 font-medium">{title}</h1>
                </div>
            )}
            <div className="p-4 flex-grow flex flex-col">{children}</div>
        </div>
    );
}
