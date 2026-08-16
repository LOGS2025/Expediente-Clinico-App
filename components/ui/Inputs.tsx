
export const DateInput = ()=> {
    return(
        <div>
            <label htmlFor="">Fecha</label>
            <input type="date" required value={formData.fecha}
            onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}/>
        </div>
    )
}
export const PasswordInput= ()=> {

}
