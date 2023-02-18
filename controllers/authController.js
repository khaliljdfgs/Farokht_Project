import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    phoneNumber1,
    phoneNumber2,
    landLine,
    companyName,
    location,
    address,
    paymentMethod,
    bankName,
    bankBranchNumber,
    bankAccountNumber,
  } = req.body;
  if (
    !name ||
    !email ||
    !password ||
    !role ||
    !phoneNumber1 ||
    !companyName ||
    !location ||
    !address ||
    !paymentMethod ||
    !bankName ||
    !bankBranchNumber ||
    !bankAccountNumber
  ) {
    throw new BadRequestError("Please provide all values");
  }
  const userAlreadyExist = await User.findOne({ email });

  if (userAlreadyExist) {
    throw new BadRequestError("Email already in use");
  }

  if (role == "admin") {
    throw new UnAuthenticatedError("You do not have rights to create admin");
  }

  const userDataFromClient = {
    name,
    email,
    password,
    role,
    phoneNumber1,
    phoneNumber2,
    landLine,
    companyName,
    location,
    address,
    paymentMethod,
    bankName,
    bankBranchNumber,
    bankAccountNumber,
  };
  if (userDataFromClient.phoneNumber2 == null) {
    delete userDataFromClient.phoneNumber2;
  }
  if (userDataFromClient.landLine == null) {
    delete userDataFromClient.landLine;
  }
  userDataFromClient.status = "pending";
  // console.log(userDataFromClient);

  const user = await User.create(userDataFromClient);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
    },
    token,
  });
};

const registerAdmin = async (req, res) => {
  const { name, email, password, user } = req.body;
  const userAdmin = await User.findOne({ _id: req.user.userId });
  if (userAdmin.role !== "admin") {
    throw new UnAuthenticatedError(
      "You do not have rights to create admin user"
    );
  }
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const userAlreadyExist = await User.findOne({ email });
  if (userAlreadyExist) {
    throw new BadRequestError("Email already in use");
  }

  const userDataFromClient = {
    name,
    email,
    password,
    role: "admin",
    status: "approved",
  };

  // console.log(userDataFromClient);

  const newUser = await User.create(userDataFromClient);
  const token = newUser.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: newUser.email,
      name: newUser.name,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const isPassword = await user.comparePassword(password);
  if (!isPassword) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
};
const updateUser = async (req, res) => {
  // console.log(req.user);
  const {
    name,
    email,
    role,
    phoneNumber1,
    phoneNumber2,
    landLine,
    companyName,
    location,
    address,
    paymentMethod,
    bankName,
    bankBranchNumber,
    bankAccountNumber,
  } = req.body;
  if (
    !name ||
    !email ||
    !role ||
    !phoneNumber1 ||
    !companyName ||
    !location ||
    !address ||
    !paymentMethod ||
    !bankName ||
    !bankBranchNumber ||
    !bankAccountNumber
  ) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });
  if (user.role == "admin") {
    throw new BadRequestError("Admin can not change his/her information");
  }

  user.email = email;
  user.name = name;
  user.role = role;
  user.phoneNumber1 = phoneNumber1;
  if (phoneNumber2) {
    user.phoneNumber2 = phoneNumber2;
  }
  if (landLine) {
    user.landLine = landLine;
  }
  user.companyName = companyName;
  user.location = location;
  user.address = address;
  user.paymentMethod = paymentMethod;
  user.bankName = bankName;
  user.bankBranchNumber = bankBranchNumber;
  user.bankAccountNumber = bankAccountNumber;

  await user.save();

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token });
};

const changePassword = async (req, res) => {

  const { userId, password, newPassword } = req.body;
  const logedInUser = await User.findOne({ _id: req.user.userId });
  if (logedInUser.role == 'admin') {
    if (!userId || !newPassword) {
      throw new BadRequestError("Please provide userId and newPassword");
    }
  }else{
    if (!userId || !password || !newPassword) {
      throw new BadRequestError("Please provide all values(userId, password, newPassword)");
    }
    if (userId != req.user.userId) {
      throw new UnAuthenticatedError("You are not allowed to change other users password")
    }
  }
  const user = await User.findOne({ _id: userId }).select("+password");
  if (logedInUser.role != 'admin'){
    const isPassword = await user.comparePassword(password);
    if (!isPassword) {
      throw new UnAuthenticatedError("Old password is incorrect");
    }
  }
  

  user.password = newPassword;
  await user.save();
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
};

const getAllUsers = async (req, res) => {
  const users = await User.find()
  res.status(StatusCodes.OK).json(users)
}

export { register, registerAdmin, login, updateUser, changePassword, getAllUsers };
