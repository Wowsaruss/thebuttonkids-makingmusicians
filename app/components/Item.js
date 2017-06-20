import React from "react";
import {Col, Thumbnail, Form, FormGroup, ControlLabel, FormControl, Button} from "react-bootstrap"
import {fetchFile, addToCart} from "../utils/api.js"

export default class Item extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      image: 'http://chimplyimage.appspot.com/images/samples/classic-spinner/indicator.gif',
      quantity: ''
    };
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
    this.handleAddToCartClick = this.handleAddToCartClick.bind(this)
  }

  componentDidMount() {
    fetchFile(this.props.product.relationships.files.data[0].id).then((file) => {
      this.setState(() => {
        return {
          image: file.data.link.href
        }
      })
    })
  }

  handleQuantityChange(e) {
    this.setState({quantity: e.target.value})
  }

  handleAddToCartClick() {
    if (this.state.quantity) {
      addToCart(this.props.product.id, this.state.quantity)
      .then((cart) => {
        console.log("added");
        console.log(cart);
        this.setState({quantity: ''})
        this.props.handleUpdatedCartTrue()
      })
    }
  }

  render() {
    return (
      <Col xs={12} sm={6} md={4} lg={3}>
        <Thumbnail src={this.state.image}>
          <p>{this.props.product.name}</p>
          <p>{this.props.product.meta.display_price.without_tax.formatted}</p>
          <Form inline>
            <FormGroup bsSize="small" controlId={this.props.product.id}>
              <ControlLabel>Quantity:</ControlLabel>
              {" "}
              <FormControl type="number" placeholder="0" value={this.state.quantity} onChange={this.handleQuantityChange}/>
            </FormGroup>
            <Button bsSize="small" type="button" onClick={this.handleAddToCartClick}>Add to Cart</Button>
          </Form>
        </Thumbnail>
      </Col>
    )
  }
}
