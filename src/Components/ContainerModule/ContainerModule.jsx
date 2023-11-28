import React, { useState } from 'react'
import { Dropdown } from '../Dropdown/Dropdown'

export const ContainerModule = ({ children, module, name, status }) => {

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        console.log(!isDropdownOpen)
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div class="card shadow container-module w-100">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-4 col-md-2 text-center " >
                        <div class="circle circle-lg bg-white">
                            <span class='fe fe-home fe-24 text-grey'></span>
                        </div>
                    </div>
                    <div class="col ml-4">
                        <strong class="mb-1">{`${module} ${name}`}</strong><span class={`dot dot-lg bg-${(status === "Active") ? "success" : "damger"} ml-2`}></span>
                        {/* <p class="small text-muted mb-1">Fringilla Ornare Placerat Consulting</p> */}
                    </div>

                    <Dropdown isDropdownOpen={isDropdownOpen} toggleDropdown={toggleDropdown}>

                        {children}

                    </Dropdown>
                </div>
            </div>
        </div>)
}
