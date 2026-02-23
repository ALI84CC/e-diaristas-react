import { Container } from "postcss"
import { DiaristasCard } from "./DiaristasCard"

export function PerfilProfissional(){
    return(
        <div>
            <div className="card-diarista">
                <DiaristasCard className="border roundp-lg flex sm:flex-col md:flex-row  rounded-full shadow-lg">
                    <Container className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

                    </Container>

                </DiaristasCard>
           </div>     
        </div>
    )
}