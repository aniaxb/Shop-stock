
export class SweetAlert {
    static accepted(swal): object {
        return swal({
            title: "Good job!",
            text: "Successfully logged in!",
            icon: "success",
        })
    }

    static error(swal, error: string): object {
        return swal({
            title: "Error",
            text: error,
            icon: "error",
        })
    }
}