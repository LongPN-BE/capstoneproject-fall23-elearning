import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { loadingState$ } from "./redux/selectors/LoadingSelector";
import { getAllAccountState$ } from "./redux/selectors/AccountSelector";
import { useEffect } from "react";
import * as accountActions from "./redux/actions/AccountAction";
import Loading from "./components/Loading/Loading";
import LandingPage from "./pages/Landing/Landing";

function App() {
  let isLoading = useSelector(loadingState$);
  const dispatch = useDispatch();
  let listAccount = useSelector(getAllAccountState$);

  useEffect(() => {
    dispatch(accountActions.getAllAccount.getAllAccountRequest());
  }, [dispatch]);

  console.log("list-account: " + JSON.stringify(listAccount))

  return (

    <div className="App">
      {
        isLoading ? <Loading /> : <LandingPage/>
        // <div>
        //   <h1>Hello World</h1>
        // </div>
      }
    </div>
  );
}

export default App;
