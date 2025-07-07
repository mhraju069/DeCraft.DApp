import Swal from 'sweetalert2';

export default function showAlert(message, alertType, onConfirm) {
    if (alertType === 'delete') {
        Swal.fire({
            title: 'Are you sure?',
            text: message || "You won't be able to revert this!",
            // imageUrl: deleteGif,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your item has been deleted.',
                    icon: 'success',
                    timer: 3000,
                });

                if (onConfirm) {
                    onConfirm(); // Run callback if provided
                }
            }
        });
    } else if (alertType === 'notAuthenticated') {
        Swal.fire({
            title: 'Not Authenticated',
            text: message || 'You need to log in to access this feature.',
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'Login',
            cancelButtonText: 'Cancel',
            allowOutsideClick: false,
            // allowEscapeKey: false,
            buttonsStyling: true,
        }).then((result) => {
            if (result.isConfirmed) {
                // Use window.location.href if not inside a React component
                window.location.href = '/login';
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // User clicked "Cancel"
                window.location.href = '/'; // fallback

            }
        });
    } else {
        Swal.fire({
            text: message,
            icon: alertType,
            buttonsStyling: true,
            confirmButtonText: 'Got it!',
            customClass: {
                confirmButton: 'btn btn-primary',
            },
            timer: 5000,
        });
    }
}
