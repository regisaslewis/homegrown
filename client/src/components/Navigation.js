import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
    return (
        <div>
            <h2>Navigation Page</h2>
            <NavLink to="/" exact>
                <button>Home</button>
            </NavLink>
            <NavLink to="/login" exact>
                <button>Login</button>
            </NavLink>
            <NavLink to="/signup" exact>
                <button>Signup</button>
            </NavLink>
            <NavLink to="/users" exact>
                <button>Users</button>
            </NavLink>
            <NavLink to="/groups" exact>
                <button>Groups</button>
            </NavLink>
            <NavLink to="/plants" exact>
                <button>Plants</button>
            </NavLink>
            <NavLink to="/plant_families" exact>
                <button>Plant Families</button>
            </NavLink>
            <NavLink to="/articles" exact>
                <button>Articles</button>
            </NavLink>
        </div>
    )
}

export default Navigation;