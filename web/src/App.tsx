import { useEffect, useState } from 'react';
import { NameSearchService } from './API/name-search-api-service';
import { CitizenNamePerAge, GraphData } from './types/index';
import { SearchComponent } from './Components/searchInput';
import StackedGraph from './Components/graph';
import './App.css';
import './styles/graph.css';
import { Color } from './API/Enums/EnumColors';

// TODO: make Ui better, display totalin, use enums, and make X button to remove search and on enter send search
function App() {
  // 2d array which holds the data for each search input
  const [data, setData] = useState<(CitizenNamePerAge[] | null)[]>([]);
  const [finalData, setFinalData] = useState<GraphData[]>();
  const [isStacked, setIsStacked] = useState(true);
  const [emriValues, setEmriValues] = useState<string[]>([]);
  const [totals, setTotals] = useState<number[]>([]);

  const handleSearch = async (input: string, index: number) => {
    if (input.trim() === '') {
      // If the input is empty, remove the corresponding data
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

      const total = response.citizensNamePerAge.reduce((sum, citizen) => sum + parseFloat(citizen.totali), 0);
      setTotals(prevTotals => {
        const newTotals = [...prevTotals];
        newTotals[index] = total;
        return newTotals;
      });
    }
  };

  useEffect(() => {
    const newData = data.map((dataItem, index) => dataItem ? [{ data: dataItem }] : []);
    setFinalData(newData.flat());
  }, [data]);

  const addSearchInput = () => {
    if (data.length < 10) {
      setData(prevData => [...prevData, null]);
      setEmriValues(prevEmriValues => [...prevEmriValues, '']);
    }
  };

  const toggleStacked = () => {
    setIsStacked(prevIsStacked => !prevIsStacked);
  };

  const removeSearchInput = (index: number) => {
    setData(prevData => prevData.filter((_, i) => i !== index));
    setTotals(prevTotals => prevTotals.filter((_, i) => i !== index));
    setEmriValues(prevEmriValues => prevEmriValues.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      {data.map((_, index) => (
        <SearchComponent
          key={index}
          total={totals[index]}
          color={Color[`Number${index + 1}` as keyof typeof Color]}
          onSearch={(input: string) => handleSearch(input, index)}
          removeInput={() => removeSearchInput(index)}
          isLast={index === data.length - 1}
        />
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