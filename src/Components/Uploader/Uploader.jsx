
export const Uploader = ({action = 'Sube una imagen del espacio.'}) => {
    return (
        <div class="card-body">
            <form action="/file-upload" class="dropzone bg-light rounded-lg" id="tinydash-dropzone">
                <div class="dz-message needsclick">
                    <div class="circle circle-lg bg-primary">
                        <i class="fe fe-upload fe-24 text-white"></i>
                    </div>
                    <h5 class="text-muted mt-4">{action}</h5>
                </div>
            </form>
            
        </div>

    )
}
