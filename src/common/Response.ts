




export type ResponseResult<SuccessObjectType, ErrorObjectType> = ResponseSuccess<SuccessObjectType> | ResponseFail<ErrorObjectType>;

export type ResponseSuccess<SuccessObjectType> = { type: "success", data: SuccessObjectType };
export type ResponseFail<ErrorObjectType> = { type: "failure", data: ErrorObjectType };



export function respondSuccess<SuccessObjectType = any>(successObject: SuccessObjectType): ResponseResult<SuccessObjectType, any> {
    return { type: "success", data: successObject };
}

export function respondError<ErrorObjectType = any>(errorObject: ErrorObjectType): ResponseResult<any, ErrorObjectType> {
    return { type: "failure", data: errorObject };
}
