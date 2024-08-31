import React, { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
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
} from "@mui/material";
import { QUIKNODE_HTTP_URL } from "../config";

const provider = new ethers.JsonRpcProvider(QUIKNODE_HTTP_URL);



const LatestBlocks: React.FC = () => {
  const [transactions, setTransactions] = useState<ethers.TransactionResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const block = await provider.getBlock("latest", true); // Fetch block with prefetched transactions

        if (block) {
          setTransactions(block.prefetchedTransactions);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    loadTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];

    return transactions.filter(
      (transaction: ethers.TransactionResponse) =>
        transaction.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.to?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, transactions]);

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ color: "#90caf9" }}>
        Latest Block Transactions
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Search by address"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={tabdleCellStyle}>Block Number</TableCell>
              <TableCell sx={tabdleCellStyle}>From</TableCell>
              <TableCell sx={tabdleCellStyle}>To</TableCell>
              <TableCell sx={tabdleCellStyle}>Value (ETH)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions?.map((tx: ethers.TransactionResponse, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell>{tx.blockNumber}</TableCell>
                  <TableCell>{tx.from}</TableCell>
                  <TableCell>{tx.to || "Contract Creation"}</TableCell>
                  <TableCell>{ethers.formatEther(tx.value)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const tabdleCellStyle = {
  color: "#1976d2",
  fontWeight: "bold",
  fontSize: "1rem",
  borderBottom: "2px solid #1976d2",
};

export default LatestBlocks;
