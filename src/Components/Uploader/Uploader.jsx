import "./Uploader.css"

export const Uploader = ({ label = 'Imagen de espacio', formatos = ".png, .jpg, .mp4, .pdf", name, value, onChange }) => {



    return (
        <div class="card-body" id="uploader">
            <label>{label}</label>
            <div class="dropzone bg-light rounded-lg" id="tinydash-dropzone" >
                <div class="dz-message needsclick">
                    <div class="circle circle-lg bg-primary">
                        <i class="fe fe-upload fe-24 text-white" />
                        <input type="file" name={name} value={value} aria-label="Archivo" onChange={onChange} accept={formatos} />
                    </div>
                </div>
            </div>
        </div>

    )
}
