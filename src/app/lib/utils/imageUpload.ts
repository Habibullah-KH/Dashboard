export const imageUpload = async (imageFile: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const apiKey = "d7aa561c3241e9313bc80d4d5929f656";
  const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      console.error("Upload failed with status:", response.status);
      return null;
    }

    // Define what the API response looks like
    const data: {
      data?: {
        url?: string;
      };
    } = await response.json();

    return data?.data?.url || null;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
};
