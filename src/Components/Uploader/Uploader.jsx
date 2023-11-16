import "./Uploader.css"

export const Uploader = ({ label = 'Imagen de espacio', formatos = ".png, .jpg" }) => {
    return (
        <div class="card-body" id="uploader">
            <label>{label}</label>
            <div class="dropzone bg-light rounded-lg" id="tinydash-dropzone" >
                <div class="dz-message needsclick">
                    <div class="circle circle-lg bg-primary">
                        <i class="fe fe-upload fe-24 text-white" />
                        <input type="file" name="src-file1" aria-label="Archivo" accept={formatos} />
                    </div>
                </div>
            </div>
        </div>

    )
}
