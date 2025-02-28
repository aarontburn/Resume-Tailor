export type ResponseResult<SuccessObjectType, ErrorObjectType> =
    ResponseSuccess<SuccessObjectType> | ResponseFail<ErrorObjectType>

export type ResponseSuccess<SuccessObjectType> = { type: "success", body: SuccessObjectType }
export type ResponseFail<ErrorObjectType> = { type: "failure", body: ErrorObjectType }

export function respondSuccess<SuccessObjectType = any>(successObject: SuccessObjectType): ResponseResult<SuccessObjectType, any> {
    return { type: "success", body: successObject }
}

export function respondError<ErrorObjectType = any>(errorObject: ErrorObjectType): ResponseResult<any, ErrorObjectType> {
    return { type: "failure", body: errorObject }
}
