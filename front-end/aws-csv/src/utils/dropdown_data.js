import { AttributeList } from '../components/radio_buttons/AttributeList';
import { CompanyList } from '../components/radio_buttons/CompanyList';
import { YearList } from '../components/radio_buttons/YearList';

export const dropdownData = [
    {
      title: 'Select Company',
      content: <CompanyList />
    },
    {
      title: 'Select Attribute',
      content: <AttributeList />
    },
    {
      title: 'Select Year',
      content: <YearList />
    }
  ];