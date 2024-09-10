const express = require("express")
const mongoose = require("mongoose")
const authRouter = require("./authRouter")
const cors = require("cors")
const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use("/auth", authRouter)

const start = async () => {
	try {
		await mongoose.connect(`mongodb+srv://Gannitto:Gannitto127@cluster0.7jlhe.mongodb.net/Gannitto+world+users?retryWrites=true&w=majority&appName=Cluster0`)
		app.listen(PORT, () => console.log(`server started on port ${PORT} `))
	} catch (e) {
		console.log(e)
	}
}

start()