import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    RequestTimeoutException,
} from '@nestjs/common';
import {
    catchError,
    Observable,
    throwError,
    timeout,
    TimeoutError,
} from 'rxjs';
// throws an error if request time is 3000 and longer
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            timeout(3000),
            catchError((err) => {
                if (err instanceof TimeoutError) {
                    return throwError(() => new RequestTimeoutException());
                }

                return throwError(() => err);
            }),
        );
    }
}
