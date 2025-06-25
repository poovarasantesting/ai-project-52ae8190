import { Toaster } from "@/components/ui/toaster";
import TodoApp from "@/components/TodoApp";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TodoApp />
      <Toaster />
    </div>
  );
}

export default App;