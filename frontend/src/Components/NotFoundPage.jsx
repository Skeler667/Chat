import { Button } from "react-bootstrap"
const NotFoundPage = () => {
    return (
    <>
    <div className="text-center">
    <img src="https://cdn2.hexlet.io/assets/error-pages/404-4b6ef16aba4c494d8101c104236304e640683fa9abdb3dd7a46cab7ad05d46e9.svg"
     alt="" 
     width='150px'
     height='150px'
     />
    <h1>Page not found</h1>
    <Button className="outline-primary"> <a style={{'color': 'black'}} href="/">Back to main</a></Button>
    </div>
    </>
    )
}
export default NotFoundPage