const { mailSender } = require("../helpers/mailService");
const {
  isValidEmail,
  generateOTP,
  generateAccessToken,
} = require("../helpers/utils");
const authSchema = require("../models/authSchema");
const { uploadToCloudinary, destroyFromCloudinary } = require("../helpers/cloudinaryService");
const registration = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName?.trim())
      return res.status(400).send({ message: "FullName is required." });
    if (!email) return res.status(400).send({ message: "Email is required." });
    if (!isValidEmail(email))
      return res.status(400).send({ message: "Email is invalid." });
    if (!password)
      return res.status(400).send({ message: "Password is required." });

    // Check if email already exist
    const existingEmail = await authSchema.findOne({ email });

    if (existingEmail)
      return res.status(400).send({ message: "This email already registerd" });

    // Generate OTP
    const OTP_Num = generateOTP();

    const user = await authSchema({
      fullName,
      email,
      password,
      otp: OTP_Num,
      otpExpiry: Date.now() + 5 * 60 * 1000,
    });
    user.save();

    await mailSender({ email, subject: "OTP Verification Mail", otp: OTP_Num });

    res
      .status(200)
      .send({ message: "Registration Successfully Please verify your email" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error!" });
  }
};

const verfyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await authSchema.findOneAndUpdate(
      {
        email,
        otp,
        otpExpiry: { $gt: Date.now() },
      },
      { isVerified: true, otp: null },
      { returnDocument: "after" },
    );
    if (!user) return res.status(400).send({ message: "Invalid request" });

    res.status(200).send({ message: "Email verified successfully." });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error!" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authSchema.findOne({ email });
    if (!user) return res.status(400).send({ message: "Invalid Credential" });
    if (!user.isVerified)
      return res.status(400).send({ message: "Email is not verified." });
    const matchPass = await user.comparePassword(password);

    if (!matchPass)
      return res.status(400).send({ message: "Invalid Credential" });

    const accessToken = generateAccessToken({
      _id: user._id,
      email: user.email,
    });

    res.cookie("accessToken", accessToken);

    res.status(200).send({ message: "Login Successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).send({ message: "Internal Server Error!" });
  }
};

const userProfile = async (req, res) => {
  try {
    const userData = await authSchema
      .findOne({ _id: req.user._id })
      .select("avatar email fullName");

    if (!userData) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error!" });
  }
};

const updateProfile = async (req, res) => {
  const { fullName } = req.body;
  const userId = req.user._id;
  try {

    const userData = await authSchema.findOne({_id: userId});

    if(fullName.trim()) userData.fullName = fullName;

    if(req.file){
      
      const avatarUrl = await uploadToCloudinary({
        mimetype: req.file.mimetype,
        imgBuffer: req.file.buffer,
      });
      
      destroyFromCloudinary(userData.avatar)
      
      userData.avatar = await avatarUrl.secure_url;
    }
    
    userData.save()
    
    res.status(200).send({message: "Profile updated successfully"})
    
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registration, verfyOTP, login, userProfile, updateProfile };