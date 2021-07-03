import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useEffect,useState, useReducer } from 'react';
import CreateAddress from './CreateAddress.js';

const ADDRESS_QUERY = gql`
query{
  customer {
    firstname
    lastname
    email
    addresses {
      id
      city
      firstname
      lastname
country_code
      region {
        region
  region_code
      }
      street
      postcode
      telephone
    }
  }
}
`;

const DELETE_ADDR_QUERY = gql`mutation ($id: Int!) {
  deleteCustomerAddress(id: $id)
}
`;


function Home() {
     const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [ getAddress, {loading, error, data} ] = useLazyQuery(ADDRESS_QUERY);
    const [isShowCreate, setIsShowCreate] = useState(false);
     const [addresses, setAddresses] = useState();
    useEffect(() => {
       getAddress();
     }, []);
    const [deleteAddress, addressDeleted] = useMutation(DELETE_ADDR_QUERY, {
        onError: (err) => {
            alert(err.message);
        }
      });
    useEffect(() => {
        console.log('address deleted')
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;

    const handleTrash = (e, id) => {
        //console.log(e,id);
        //return false;
        e.preventDefault();
        deleteAddress({
            variables:{
                id
            }
        })
        getAddress()

    }

    const handleShowNewAddresForm = (e) => {
        setIsShowCreate(true);
    }

    if (isShowCreate) {
        return <CreateAddress setIsShowCreate={setIsShowCreate} getAddress={getAddress} />
    }

  return (
    <div className="container mb-5">
      <div className="row row-cols-4 ">
        {data && data.customer && data.customer.addresses.map((addr)=> {
            return (
                <div className="mt-1" key={addr.id}>
                <div className="card h-100 bg-light">
                  <div className="card-body">
                    <h5 className="card-title">Address ID: {addr.id}</h5>
                    <p className="card-text">{addr.firstname} {addr.lastname}</p>
                    {addr.street.map((st, idx) => {
                        return (
                            <p className="card-text" key={idx+st}>{st}</p>
                        );
                    })}
                    <p className="card-text">{addr.city}</p>
                    <p className="card-text">{addr.region.region}</p>
                    <p className="card-text">{addr.country_code}</p>
                    <p className="card-text">{addr.telephone}</p>
                    <p className="card-text float-end">
                        <button className="btn" onClick={(e) =>{handleTrash(e,addr.id)}}><FontAwesomeIcon icon={faTrash} /></button>
                    </p>
                  </div>
                </div>
                </div>
            ); 
        })}
      </div>
      <div className="row justify-content-md-center mt-3">
          
          <div className="col-md-auto">
            <button type="button" className="btn btn-block btn-dark" onClick={handleShowNewAddresForm}>Add ADDR</button>
          </div>
        </div>
    </div>
  );
}

export default Home;
