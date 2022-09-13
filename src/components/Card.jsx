
	import '../Card.css';

	import { createSignal, onMount } from 'solid-js';
	import axios                     from 'axios';


	function Card(){

		const [ loading,  setLoading  ] = createSignal();
		const [ isFemale, setIsFemale ] = createSignal();
		const [ name,     setName     ] = createSignal();
		const [ phone,    setPhone    ] = createSignal();
		const [ email,    setEmail    ] = createSignal();
		const [ gender,   setGender   ] = createSignal();
		const [ picture,  setPicture  ] = createSignal();

		setLoading  ( true  );
		setIsFemale ( false );

		const getUser = () => {

			setLoading( true );

			axios.get( 'https://randomuser.me/api/' ).then( response => {

				let user = response.data.results[ 0 ];

				setName    ( user.name.first + ' ' + user.name.last );
				setPhone   ( user.phone                             );
				setEmail   ( user.email                             );
				setGender  ( user.gender                            );
				setPicture ( user.picture.large                     );

				( user.gender === 'female' ) ? setIsFemale( true ) : setIsFemale( false );

				setLoading( false );

			});

		}

		onMount( async () => {

			getUser();

		});

		return ( <>

			<div class="row">

				<div class="col-md-4"></div>

				<div class={`col-md-4 card p-4 text-center ${ isFemale() === true ? 'pink0' : 'blue0' } ${ loading() === true ? 'loading' : '' }`} style={{ height: '400px' }}>

					<div class="card-top p-4">

						<img class="rounded-circle" src={ picture() } alt="" />

					</div>

					<div class="card-title h4">{ name() }</div>

					<div class="card-title h6 mt-2">{ phone() }</div>

					<div class="card-title h6 mt-2">{ email() }</div>

					<button class={`btn mt-4 ${ isFemale() === true ? 'pink' : 'blue text-light' }`} onClick={ getUser }>Randomize</button>

				</div>

				<div class="col-md-4"></div>

			</div>

		</> );

	}

	export default Card;
