import { useEffect, useState } from 'react';
import { NameSearchService } from './API/name-search-api-service';
import { CitizenNamePerAge, GraphData } from './types/index';
import { SearchComponent } from './Components/searchInput';
import StackedGraph from './Components/graph';
import './App.css';
import './styles/graph.css';

function App() {
  const [data, setData] = useState<(CitizenNamePerAge[] | null)[]>([]);
  const [finalData, setFinalData] = useState<GraphData[]>();
  const [isStacked, setIsStacked] = useState(true);
  const [emriValues, setEmriValues] = useState<string[]>([]);

  const handleSearch = async (input: string, index: number) => {
    if (input.trim() === '') {
      // If the input is empty, remove the corresponding data and emri value
      setData(prevData => prevData.filter((_, i) => i !== index));
      setEmriValues(prevEmriValues => prevEmriValues.filter((_, i) => i !== index));
    } else {
      const service = new NameSearchService();
      const response = await service.searchName(input);
      setData(prevData => {
        const newData = [...prevData];
        newData[index] = response.citizensNamePerAge;
        return newData;
      });
      setEmriValues(prevEmriValues => {
        const newEmriValues = [...prevEmriValues];
        newEmriValues[index] = input;
        return newEmriValues;
      });
    }
  };

  useEffect(() => {
    const newData = data.map((dataItem, index) => dataItem ? [{ data: dataItem }] : []);
    setFinalData(newData.flat());
  }, [data]);

  const addSearchInput = () => {
    setData(prevData => [...prevData, null]);
  };

  const toggleStacked = () => {
    setIsStacked(prevIsStacked => !prevIsStacked);
  };

  return (
    <div className="App">
      {data.map((_, index) => (
        <SearchComponent key={index} onSearch={(input: string) => handleSearch(input, index)} />
      ))}
      <div style={{ marginTop: '20px', marginBottom: '50px' }}>
        <button onClick={addSearchInput}>+</button>
        <button onClick={toggleStacked}>{isStacked ? 'Switch to Overlay' : 'Switch to Stacked'}</button>
      </div>


      <div className='center-content'>
        {finalData && <StackedGraph graphData={finalData} isStacked={isStacked} emriValues={emriValues} />}
      </div>

    </div>
  );
}

export default App;