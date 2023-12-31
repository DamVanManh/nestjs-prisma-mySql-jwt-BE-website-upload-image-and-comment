import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '../dtos/response.dto';

export class ResponseHelper {
    static success<T>(data: T, message = 'Success', status = HttpStatus.OK): ApiResponse<T> {
        return {
            status,
            message,
            data,
            date: new Date()
        };
    }

    static error(message = 'Faild', status = HttpStatus.BAD_REQUEST): void {
        throw new HttpException(message, status);
    }

    static internalError<T>(message = 'Internal error', status = HttpStatus.INTERNAL_SERVER_ERROR): void {
        throw new HttpException(message, status);
    }
}