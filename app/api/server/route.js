import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// MongoDB connection function
const connect = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "TodoWeb",
  });
};

// Schema + Model
const todoSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  todo: String,
  isCom: Boolean,
  user: { type: String, required: true }, // user field is important
});

const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);

// POST - Create or Update a guest todo
export async function POST(req) {
  try {
    await connect();
    const body = await req.json();
    const { id, todo, isCom } = body;

    if (!id || !todo || typeof isCom !== "boolean") {
      return NextResponse.json({ success: false, message: "Missing or invalid fields" }, { status: 400 });
    }

    const existing = await Todo.findOne({ id, user: "guest" });

    if (existing) {
      await Todo.updateOne({ id, user: "guest" }, { $set: { todo, isCom } });
      return NextResponse.json({ success: true, message: 'Guest todo updated successfully' });
    } else {
      await Todo.create({ id, todo, isCom, user: "guest" });
      return NextResponse.json({ success: true, message: 'Guest todo created successfully' });
    }

  } catch (error) {
    console.error("POST /api/server error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
      detail: error.message,
    }, { status: 500 });
  }
}

// GET - Fetch all guest todos
export async function GET() {
  try {
    await connect();
    const guestTodos = await Todo.find({ user: "guest" });
    return NextResponse.json({ success: true, todos: guestTodos });
  } catch (error) {
    console.error("GET /api/server error:", error);
    return NextResponse.json({ success: false, message: 'Internal Server Error', detail: error.message }, { status: 500 });
  }
}

// DELETE - Delete a guest todo by ID
export async function DELETE(req) {
  try {
    await connect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: "Missing ID" }, { status: 400 });
    }

    const deletedTodo = await Todo.findOneAndDelete({ id, user: "guest" });

    if (!deletedTodo) {
      return NextResponse.json({ success: false, message: "Todo not found for guest" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Guest todo deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/server error:", error);
    return NextResponse.json({ success: false, message: 'Internal Server Error', detail: error.message }, { status: 500 });
  }
}
