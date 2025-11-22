import Swal from 'sweetalert2';

export const promptPassword = async (
  title: string,
  text: string
): Promise<string | undefined> => {
  const { value: password } = await Swal.fire({
    title,
    text,
    input: 'password',
    inputPlaceholder: 'Enter password',
    inputAttributes: {
      autocapitalize: 'off',
      autocorrect: 'off',
    },
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#2563eb',
    cancelButtonColor: '#dc2626',
    theme: 'dark',
    inputValidator: (value: string) => {
      if (!value.trim()) {
        return 'Password cannot be blank!';
      }

      return null;
    },
  });

  return password;
};