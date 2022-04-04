import { useRouter } from "next/router";
import Register from "../components/Register";
import MarkerService from "../services/markersService";

interface RegisterPageProps {
  selectOptions: any;
}

function RegisterPage({ selectOptions }: RegisterPageProps) {
  return <Register selectOptions={selectOptions} />
}

export default RegisterPage;

export const getStaticProps = async () => {
  const selectOptions = await MarkerService.getAll();

  return {
    props: {
      selectOptions,
    },
    revalidate: 300,
  };
};
