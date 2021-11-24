import { useState, useEffect } from "react";

import Icon from "@mdi/react";
import { mdiSortAscending } from "@mdi/js";
import { mdiSortDescending } from "@mdi/js";

import Dialog from "js/components/foundation/Dialog";
import Button from "js/components/foundation/Button";
import ListRadioButton from "js/components/foundation/ListRadioButton";

import SortList from "data/sort.json";
import workerSortTypeLabel from "js/webworkers/flights/sortTypeLabel.worker.js";
const worker_SortTypeLabel = new workerSortTypeLabel();

const FlightsLiveSort = ({ sort, setSortType, setSortOrder }) => {
  const [sortTypeIsOpen, setSortTypeIsOpen] = useState(false);
  const [currentSortType, setCurrentSortType] = useState("");

  useEffect(() => {
    worker_SortTypeLabel.onmessage = e => {
      setCurrentSortType(e.data);
    };
    worker_SortTypeLabel.postMessage({ list: SortList, current: sort.sortType });
  }, [sort.sortType]);

  const sortTypeState = () => {
    setSortTypeIsOpen(!sortTypeIsOpen);
  };

  const selectSortType = e => {
    setSortType(e.target.value);
    if (e.target.value == "") {
      setSortOrder("");
    } else {
      setSortOrder("asc");
    }
    sortTypeState();
  };

  const ascOrder = () => {
    setSortOrder("asc");
  };

  const descOrder = () => {
    setSortOrder("desc");
  };

  return (
    <Fragment>
      <div className='flights-results--sort d-flex justify-content-between align-items-center mb-5'>
        <dl
          className='flights-results--sort-type d-flex align-items-center'
          role='button'
          onClick={sortTypeState}
          tabIndex='0'
        >
          <dt>Sort by:</dt>
          <dd>{currentSortType}</dd>
        </dl>
        {sort.sortOrder !== "" && (
          <div className='flights-results--sort-order list-unstyled d-flex align-items-center'>
            <Button
              size='sm'
              color={sort.sortOrder == "asc" ? "primary" : "transparent"}
              icon={<Icon path={mdiSortAscending} />}
              onClick={ascOrder}
            />
            <Button
              size='sm'
              color={sort.sortOrder == "desc" ? "primary" : "transparent"}
              icon={<Icon path={mdiSortDescending} />}
              className='ml-2'
              onClick={descOrder}
            />
          </div>
        )}
      </div>
      <Dialog
        active={sortTypeIsOpen}
        className={classNames("sort")}
        title='Sort by'
        dialogClass=''
        closeDialog={sortTypeState}
      >
        <div className='buttons-list'>
          {[...SortList].map((item, index) => (
            <ListRadioButton
              key={index.toString()}
              className={classNames({ active: item.value === sort.sortType })}
              value={item.value}
              name='sortType'
              label={item.name}
              checked={item.value === sort.sortType}
              onChange={selectSortType}
            />
          ))}
        </div>
      </Dialog>
    </Fragment>
  );
};

export default connect(
  state => ({
    sort: state.FlightsLiveFilter.sort
  }),
  dispatch => ({
    setSortType: value => {
      dispatch({ type: "SORT_TYPE", sortType: value });
    },
    setSortOrder: value => {
      dispatch({ type: "SORT_ORDER", sortOrder: value });
    }
  })
)(FlightsLiveSort);
