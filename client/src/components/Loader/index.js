import { Grid } from 'react-loader-spinner';

const Loader = () => {
 return (
        <div className="loader">
        <Grid
          height="80"
          width="80"
          radius="12"
          color="#220c37"
          ariaLabel="grid-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  };

export default Loader;
