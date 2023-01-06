
export class SweetAlert {

    static accepted(swal, message: string): object {
        return swal({
            title: "Good job!",
            text: message,
            icon: "success",
        })
    }

    static error(swal, message: string): object {
        return swal({
            title: "Error",
            text: message,
            icon: "error",
        })
    }
}