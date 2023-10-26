const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, "อีเมลนี้ถูกใช้งานไปแล้ว"],
        validate: [validator.isEmail, 'กรุณากรอกอีเมลที่ให้ถูกต้อง']
    },
    password: {
        type: String,
        required: [true, "กรุณากรอกรหัสผ่าน"],
        minLength: [6, "รหัสผ่านของคุณต้องมีความยาวอย่างน้อย 6 ตัวอักษร"],
        select: false, //dont send back password after request
    },
    fullName: String,
    tel: String,
    role: {
        type: String,
        default: 'user',
        enum: {
            values: [
                'user',
                'admin'
            ],
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
},{
    timestamps: true
}
)

// ENCRYPTION 
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}


module.exports = mongoose.models.User || mongoose.model('User', userSchema)