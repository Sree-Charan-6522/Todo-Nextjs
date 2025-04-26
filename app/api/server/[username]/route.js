import { NextResponse } from 'next/server'
import mongoose from 'mongoose'


const connect = async () => {
    if (mongoose.connections[0].readyState) return
    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "TodoWeb",
    })
}

// Schema + Model
const todoSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    todo: String,
    isCom: Boolean,
    user : { type: String, required: true } // Add user field to the schema
})

const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema)

// POST - Create or update a todo
export async function POST(req,{params}) {
    const { username } = params;
    try {
        await connect()
        const body = await req.json()
        const { id, todo, isCom } = body

        if (!id || !todo || typeof isCom !== "boolean") {
            return NextResponse.json({ success: false, message: "Missing or invalid fields" }, { status: 400 })
        }

        const existing = await Todo.findOne({ id, user: username })

        if (existing) {
            await Todo.updateOne({ id,user:username }, { $set: { todo: todo, isCom: isCom } })
            return NextResponse.json({ success: true, message: 'Todo updated successfully' })
        } else {
            await Todo.create({ id, todo, isCom,user: username })
            return NextResponse.json({ success: true, message: 'Todo created successfully' })
        }

    }
    catch (error) {
        console.error("POST /api/server/[username] error:", {
            message: error.message,
            stack: error.stack,
            cause: error.cause,
        })
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            detail: error.message
        }, { status: 500 })
    }

}

// GET - Fetch all user todos

export async function GET(req, {params}) {
    const { username } = params;
  try {
    await connect();
    const userTodos = await Todo.find({ user: username });
    return NextResponse.json({ success: true, todos: userTodos });
  } catch (error) {
    console.error("GET /api/server error:", error);
    return NextResponse.json({ success: false, message: 'Internal Server Error', detail: error.message }, { status: 500 });
  }

}


// DELETE - Delete a todo by ID
export async function DELETE(req,{params}) {
    const { username } = params;
    try {
        await connect()
        const { id } = await req.json()

        if (!id) {
            return NextResponse.json({ success: false, message: "Missing ID" }, { status: 400 })
        }

        const deletedTodo = await Todo.findOneAndDelete({ id , user: username })

        if (!deletedTodo) {
            return NextResponse.json({ success: false, message: "Todo not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: "Todo deleted successfully" })
    } catch (error) {
        console.error("Error in DELETE /api/server:", error)
        return NextResponse.json({ success: false, message: 'Internal Server Error', detail: error.message }, { status: 500 })
    }
}