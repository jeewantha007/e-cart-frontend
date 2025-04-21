import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TextField,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

import { ExpandMore, ExpandLess } from "@mui/icons-material";

export default function AdminOrders() {
  const [groupedOrders, setGroupedOrders] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/orders/admin")
      .then((response) => {
        const rawOrders = response.data;
        const grouped = {};

        rawOrders.forEach((order) => {
          if (!grouped[order.order_id]) {
            grouped[order.order_id] = {
              order_id: order.order_id,
              user_id: order.user_id,
              payment_method: order.payment_method,
              total_amount: order.total_amount,
              created_at: order.created_at,
              payment_status: order.payment_status,
              paid_amount: order.paid_amount,
              items: [],
            };
          }

          grouped[order.order_id].items.push({
            product_name: order.product_name,
            quantity: order.quantity,
            price: order.price,
            item_total_price: order.item_total_price,
          });
        });

        setGroupedOrders(Object.values(grouped));
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleToggle = (orderId) => {
    setExpandedRows((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const filteredOrders = groupedOrders.filter((order) =>
    order.order_id.toString().includes(searchTerm)
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Order Details
      </Typography>

      <Box sx={{ marginBottom: 2, display: "flex", justifyContent: "center" }}>
        <TextField
          label="Search by Order ID"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1e1e2f" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                No
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Order ID
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                User ID
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Payment Method
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Total Amount
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Created At
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Items
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Payment Status
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Paid Amount
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredOrders.map((order, index) => (
              <React.Fragment key={order.order_id}>
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>{order.user_id}</TableCell>
                  <TableCell>{order.payment_method}</TableCell>
                  <TableCell>{order.total_amount}</TableCell>
                  <TableCell>
                    {new Date(order.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleToggle(order.order_id)}
                      size="small"
                    >
                      {expandedRows.includes(order.order_id) ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{order.payment_status}</TableCell>
                  <TableCell>{order.paid_amount}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    colSpan={9}
                    sx={{ paddingBottom: 0, paddingTop: 0 }}
                  >
                    <Collapse
                      in={expandedRows.includes(order.order_id)}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box
                        margin={2}
                        sx={{
                          backgroundColor: "#f9f9f9",
                          borderRadius: 2,
                          padding: 2,
                          border: "1px solid #ddd",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          gutterBottom
                        >
                          Order Items
                        </Typography>

                        {order.items.map((item, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: 1,
                              backgroundColor:
                                idx % 2 === 0 ? "#ffffff" : "#f0f0f0",
                              borderRadius: 1,
                              marginBottom: 1,
                              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                            }}
                          >
                            <Typography sx={{ flex: 2 }}>
                              <strong>Product:</strong> {item.product_name}
                            </Typography>
                            <Typography sx={{ flex: 1 }}>
                              <strong>Qty:</strong> {item.quantity}
                            </Typography>
                            <Typography sx={{ flex: 1 }}>
                              <strong>Price:</strong> {item.price}
                            </Typography>
                            <Typography sx={{ flex: 1 }}>
                              <strong>Total:</strong> {item.item_total_price}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
