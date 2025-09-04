import './buttonFill.css'

type buttonFillProps = {
    children:React.ReactNode;
}

export default function ButtonFill({children} : buttonFillProps){
    return(
        <>
        <div className="button_container">
        {children}
        </div>
        </>
    );
}