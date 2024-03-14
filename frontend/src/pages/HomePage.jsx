import { Balance } from "../components/Balance";
import { NavBar } from "../components/NavBar";
import { Users } from "../components/Users";

export function HomePage()
{
    return (
        <div>
        <NavBar/>
        <Balance/>
        <Users/>
        </div>
    )
}