// const express = require('express')
// const mongoose = require('mongoose')
import express from 'express'
import mongoose from 'mongoose'
import cors from "cors"
import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 8000;

const app = express()

mongoose.connect(uri, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('Database connected...')
})

app.use(express.json())
app.use(cors())


// Manage restaurant by Admin
import ManageResbyAdmin from './routes/admin/restaurantRouter.js'
app.use('/admin/restaurant',ManageResbyAdmin)

//Registration
import register from './routes/registrationRouter.js'
app.use('/',register)



app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})