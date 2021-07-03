import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import { useQuery, gql, useMutation } from "@apollo/client";


const CREAT_ADDR_QUERY = gql`mutation(
    $country: CountryCodeEnum!,
    $first: String!,
    $last: String!,
    $city: String!,
    $telephone: String!,
    $regin: Int!,
    $address: [String!]
) {
  createCustomerAddress(input: {
    region: {
      region_id: $regin
    }
    country_code: $country
    street: $address
    telephone: $telephone
    postcode: "77777"
    city: $city
    firstname: $first
    lastname: $last
    default_shipping: false
    default_billing: false
  }) {
    id
    region {
      region
      region_code
    }
    country_code
    street
    telephone
    postcode
    city
    default_shipping
    default_billing
  }
}
`;


export default function CreateAddress({setIsShowCreate, getAddress}) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [error, setError] = useState();
    const [createAddress] = useMutation(CREAT_ADDR_QUERY, {
        onError: (err) => {
            setError(err.message);
        },
        onCompleted: () => {
            getAddress()
        }
      });
      const onSubmit = (data) =>{
           
           const {resData} =  createAddress({ variables:{
             country: data.country,
             first: data.firstname,
             last: data.lastname,
             city: data.city,
             telephone: data.phone,
             regin: data.state,
             address: [data.address1,data.address2],
           }});
           console.log(data)
           setIsShowCreate(false)
       }



    return (
            <div className="container">
              <div className="row justify-content-md-center mt-3">
                  <div className="col-5">
                    <div className="card h-100 bg-light">
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="card-body">
                            <h5 className="card-title">Address ID: </h5>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">First name</label>
                                    <input type="text" className="form-control" {...register("firstname")}  />
                                </div>
                                <div className="col">
                                    <label className="form-label">Last name</label>
                                    <input type="text" className="form-control" {...register("lastname")} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">Address</label>
                                    <input type="text" className="form-control" {...register("address1")} />
                                </div>
                            </div>
                            <div className="row mt-2" >
                                <div className="col">
                                    <input type="text" className="form-control" {...register("address2")} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">City</label>
                                    <input type="text" className="form-control"  {...register("city")}  />
                                </div>
                                <div className="col">
                                    <label className="form-label">State</label>
                                    <input type="number" className="form-control" max="10" min="1" defaultValue="4"  {...register("state")} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">Country</label>
                                    <input type="text" className="form-control" defaultValue="US" {...register("country")}  />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">Telephone</label>
                                    <input type="text" className="form-control"  {...register("phone")} />
                                </div>
                            </div>
                            <div className="d-grid gap-2 mt-2">
                              <button className="btn btn-dark" type="submit">Save Address</button>
                            </div>
                            <div className="row mt-2">
                              {error}
                            </div>
                        </div>
                        </form>
                    </div>
                  </div>
              </div>
            </div>
            );
}