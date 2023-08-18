import { showToast } from "../component/Toast";

export const fetchSignup = async (data: FormData) => {
  try {
    const response = await fetch(`/accounts`, {
      method: 'POST',
      headers: {  },
      body: data,
    });

    if (!response.ok) {
      if (response.status === 400) showToast('Email already exists', 'danger');
      throw new Error('could not fetch the data for that resource');
    }

    if (response.status === 201)
      showToast('Congratulations! Your account has been successfully created!');

    return response;
  } catch (error:any) {
    console.log(error.message);
  }
};