import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Trash2 } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const { toast } = useToast();

  const addTodo = () => {
    if (!newTodo.trim()) {
      toast({
        title: "Error",
        description: "Task cannot be empty!",
        variant: "destructive",
      });
      return;
    }

    const todo: Todo = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
    };

    setTodos([...todos, todo]);
    setNewTodo("");
    
    toast({
      title: "Task added",
      description: "Your new task was added successfully.",
    });
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = { ...todo, completed: !todo.completed };
          
          toast({
            title: updatedTodo.completed ? "Task completed" : "Task reopened",
            description: updatedTodo.text,
          });
          
          return updatedTodo;
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id: number) => {
    const todoToDelete = todos.find(todo => todo.id === id);
    setTodos(todos.filter((todo) => todo.id !== id));
    
    toast({
      title: "Task deleted",
      description: todoToDelete?.text,
      variant: "destructive",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Card className="shadow-lg">
        <CardHeader className="bg-primary text-white rounded-t-lg">
          <CardTitle className="text-center text-2xl font-bold">Todo List</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex gap-2 mb-6">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a new task..."
              className="flex-1"
            />
            <Button onClick={addTodo}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>

          {todos.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No tasks yet. Add some tasks to get started!
            </div>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      id={`todo-${todo.id}`}
                    />
                    <label
                      htmlFor={`todo-${todo.id}`}
                      className={`cursor-pointer ${
                        todo.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {todo.text}
                    </label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}