type AppShellProps = {
  children: React.ReactNode;
};
export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="w-screen h-full">
      <div className="max-w-5xl mx-auto py-10 px-4 bg-gray-50 h-full">
        <h1 className="text-3xl font-bold underline">Chat App</h1>
        <div className="w-full h-full flex items-center justify-center flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
