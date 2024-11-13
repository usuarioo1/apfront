import { apiCadenas } from "@/utils/api";

export async function getCadenas(){
    const res = await fetch(apiCadenas);
    const data = await res.json();
    return data.info
};

export const getCadenasById = async(id) => {
    try {
        const response = await fetch(`${apiCadenas}/${id}`)
        const data = await response.json();

        if(data && data.success && data.info){
            return data.info;
        }else{
            console.error('cadena no encontrada')
            return null;
        }
    } catch (error) {
        console.error('error al encontrar la cadena', error)
        return null;
    }
}