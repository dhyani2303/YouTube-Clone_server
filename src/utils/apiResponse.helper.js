const successResponse = (res, msg) => {
	var data = {
		status: 1,
		code: 200,
		message: msg,
	};
	return res.status(200).json(data);
};
const successResponseWithData = (res, msg, data) => {
	var resData = {
		status: 1,
		code: 200,
		message: msg,
		data: data,
	};
	return res.status(200).json(resData);
};
const notFoundResponse = (res, msg) => {
	var data = {
		status: 0,
		code: 404,
		message: msg,
	};
	return res.status(404).json(data);
};
const validationError= (res, msg) => {
	var resData = {
		status: 0,
		code: 400,
		message: msg,
	};
	return res.status(400).json(resData);
};

const notAuthenticated=(res,msg)=>{
	var resData={
		status:0,
		code:401,
		msg:msg
	};
	return res.status(401).json(resData);
}

const forbidden=(res,msg)=>{
	var resData={
		status:0,
		code:403,
		msg:msg
	};
	return res.status(403).json(resData);
}


const apiResponseHelper = {
	successResponse,
	successResponseWithData,
	notFoundResponse,
	validationError,
	notAuthenticated,
	forbidden
};
module.exports = apiResponseHelper