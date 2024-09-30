import Header from "../../components/Header";


export default function ResourceLayout({ children }) {
  return (
    <div className=" flex flex-col flex-grow max-w-4xl">
      
        <Header />
        {children }
     
    </div>
  );
}
