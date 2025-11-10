const API_URL = "https://edubank.onrender.com";

export const editarPerfilService = async (data) => {
    
    console.log(data);
    const res = await fetch(`${API_URL}/usuarios/${data.IdUsuario}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    console.log(res);

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Error al editar el perfil");
    }

    return res.json();
}

