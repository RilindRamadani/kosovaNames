import { useEffect, useState } from 'react';
import { NameSearchService } from './API/name-search-api-service';
import { CitizenNamePerAge, GraphData } from './types/index';
import { SearchComponent } from './Components/searchInput';
import StackedGraph from './Components/graph';
import './App.css';

function App() {
  const [data1, setData1] = useState<CitizenNamePerAge[] | null>(null);
  const [data2, setData2] = useState<CitizenNamePerAge[] | null>(null);
  const [finalData, setFinalData] = useState<GraphData[]>();

  const handleSearch1 = async (input: string) => {
    const service = new NameSearchService();
    const response = await service.searchName(input);
    // console.log(response);
    setData1(response.citizensNamePerAge);
  };

  const handleSearch2 = async (input: string) => {
    const service = new NameSearchService();
    const response = await service.searchName(input);
    // console.log(response);
    setData2(response.citizensNamePerAge);
  };

  useEffect(() => {
    const newData1 = data1 ? [{ data: data1 }] : [];
    const newData2 = data2 ? [{ data: data2 }] : [];
    setFinalData([...newData1, ...newData2]);
}, [data1, data2]);

  return (
    <div className="App">
      <SearchComponent onSearch={handleSearch1} />
      <SearchComponent onSearch={handleSearch2} />

      <div className=''>
        {finalData && <StackedGraph graphData={finalData} />}
      </div>

    </div>
  );
}

export default App;