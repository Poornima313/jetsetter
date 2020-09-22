import React, { Component } from "react";

import NewItem from "./NewItem";
import CountDown from "./CountDown";
import Items from "./Items";

import "./Application.css";

import ItemStore from "../ItemStore";

class Application extends Component {
  state = {
    items: ItemStore.getItems(),
  };

  markAllAsUnpacked = () => {
    const items = this.state.items.map((item) => {
      return { ...item, packed: false };
    });
    this.setState({ items });
  };

  updateItems = () => {
    this.setState({
      items: ItemStore.getItems(),
    });
  };

  componentDidMount() {
    ItemStore.on("change", this.updateItems);
  }

  componentWillUnmount() {
    ItemStore.off("change", this.updateItems);
  }

  render() {
    const { items } = this.state;
    const packedItems = items.filter((item) => item.packed);
    const unpackedItems = items.filter((item) => !item.packed);

    return (
      <div className="Application">
        <NewItem />
        <CountDown {...this.state} />
        <Items title="Unpacked Items" items={unpackedItems} />
        <Items title="Packed Items" items={packedItems} />
        <button
          className="button full-width"
          onClick={() => this.markAllAsUnpacked()}
        >
          Mark all as Unpacked
        </button>
      </div>
    );
  }
}

export default Application;
